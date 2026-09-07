"use client"

import * as React from "react"
import { ArrowDownIcon } from "lucide-react"

import { Button } from "./button.js"
import { cn } from "../../lib/utils.js"

interface MessageScrollerContextValue {
  viewportRef: React.RefObject<HTMLDivElement | null>
  scrollToEnd: (options?: ScrollIntoViewOptions) => void
  scrollToStart: (options?: ScrollIntoViewOptions) => void
  scrollToMessage: (id: string, options?: ScrollIntoViewOptions) => void
  isAtBottom: boolean
  isAtTop: boolean
  isScrollable: boolean
}

const MessageScrollerContext =
  React.createContext<MessageScrollerContextValue | null>(null)

function useMessageScrollerContext() {
  const context = React.useContext(MessageScrollerContext)
  if (!context) {
    throw new Error(
      "useMessageScroller must be used within a MessageScroller or MessageScrollerProvider."
    )
  }
  return context
}

function useMessageScroller() {
  const { scrollToEnd, scrollToStart, scrollToMessage } =
    useMessageScrollerContext()
  return React.useMemo(
    () => ({
      scrollToEnd,
      scrollToStart,
      scrollToMessage,
    }),
    [scrollToEnd, scrollToStart, scrollToMessage]
  )
}

function useMessageScrollerScrollable() {
  const { isAtBottom, isAtTop, isScrollable } = useMessageScrollerContext()
  return { isAtBottom, isAtTop, isScrollable }
}

function useMessageScrollerVisibility() {
  const { isAtBottom } = useMessageScrollerContext()
  return { isVisible: !isAtBottom }
}

interface MessageScrollerProviderProps {
  children?: React.ReactNode
  autoScroll?: boolean
  defaultScrollPosition?: "start" | "end"
}

function MessageScrollerProvider({
  children,
  autoScroll = false,
  defaultScrollPosition = "end",
}: MessageScrollerProviderProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const [isAtBottom, setIsAtBottom] = React.useState(
    defaultScrollPosition === "end"
  )
  const [isAtTop, setIsAtTop] = React.useState(
    defaultScrollPosition === "start"
  )
  const [isScrollable, setIsScrollable] = React.useState(false)

  const scrollToEnd = React.useCallback((options?: ScrollIntoViewOptions) => {
    if (viewportRef.current) {
      if (typeof viewportRef.current.scrollTo === "function") {
        viewportRef.current.scrollTo({
          top: viewportRef.current.scrollHeight,
          behavior: options?.behavior ?? "smooth",
        })
      } else {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight
      }
    }
  }, [])

  const scrollToStart = React.useCallback((options?: ScrollIntoViewOptions) => {
    if (viewportRef.current) {
      if (typeof viewportRef.current.scrollTo === "function") {
        viewportRef.current.scrollTo({
          top: 0,
          behavior: options?.behavior ?? "smooth",
        })
      } else {
        viewportRef.current.scrollTop = 0
      }
    }
  }, [])

  const scrollToMessage = React.useCallback(
    (id: string, options?: ScrollIntoViewOptions) => {
      if (viewportRef.current) {
        const el = viewportRef.current.querySelector(
          `[data-message-id="${id}"]`
        )
        if (el) {
          if (typeof el.scrollIntoView === "function") {
            el.scrollIntoView({
              behavior: options?.behavior ?? "smooth",
              block: "nearest",
            })
          }
        }
      }
    },
    []
  )

  const value = React.useMemo(
    () => ({
      viewportRef,
      scrollToEnd,
      scrollToStart,
      scrollToMessage,
      isAtBottom,
      isAtTop,
      isScrollable,
      setIsAtBottom,
      setIsAtTop,
      setIsScrollable,
      autoScroll,
    }),
    [
      scrollToEnd,
      scrollToStart,
      scrollToMessage,
      isAtBottom,
      isAtTop,
      isScrollable,
      autoScroll,
    ]
  )

  return (
    <MessageScrollerContext.Provider value={value}>
      {children}
    </MessageScrollerContext.Provider>
  )
}

function MessageScroller({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(MessageScrollerContext)

  const content = (
    <div
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )

  if (!context) {
    return <MessageScrollerProvider>{content}</MessageScrollerProvider>
  }

  return content
}

function MessageScrollerViewport({
  className,
  onScroll,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(MessageScrollerContext)
  const ref = context?.viewportRef

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(e)
    const el = e.currentTarget
    const threshold = 10
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
    const atTop = el.scrollTop <= threshold
    const scrollable = el.scrollHeight > el.clientHeight

    const mutableContext = context as unknown as {
      setIsAtBottom?: (v: boolean) => void
      setIsAtTop?: (v: boolean) => void
      setIsScrollable?: (v: boolean) => void
    }
    mutableContext?.setIsAtBottom?.(atBottom)
    mutableContext?.setIsAtTop?.(atTop)
    mutableContext?.setIsScrollable?.(scrollable)
  }

  return (
    <div
      ref={ref}
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain",
        className
      )}
      onScroll={handleScroll}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col gap-8", className)}
      {...props}
    />
  )
}

interface MessageScrollerItemProps extends React.ComponentProps<"div"> {
  scrollAnchor?: boolean
  messageId?: string
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  messageId,
  ...props
}: MessageScrollerItemProps) {
  return (
    <div
      data-slot="message-scroller-item"
      data-scroll-anchor={scrollAnchor}
      data-message-id={messageId}
      className={cn("min-w-0 shrink-0", className)}
      {...props}
    />
  )
}

interface MessageScrollerButtonProps extends React.ComponentProps<
  typeof Button
> {
  direction?: "start" | "end"
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  variant = "secondary",
  size = "icon-sm",
  onClick,
  ...props
}: MessageScrollerButtonProps) {
  const { scrollToEnd, scrollToStart } = useMessageScrollerContext()

  const handleClick: React.ComponentProps<typeof Button>["onClick"] = (e) => {
    onClick?.(e)
    if (!e.defaultPrevented) {
      if (direction === "end") {
        scrollToEnd()
      } else {
        scrollToStart()
      }
    }
  }

  return (
    <Button
      data-slot="message-scroller-button"
      data-direction={direction}
      variant={variant}
      size={size}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 shadow-md",
        direction === "end" ? "bottom-4" : "top-4",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon
            className={cn("size-4", direction === "start" && "rotate-180")}
          />
          <span className="sr-only">
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </span>
        </>
      )}
    </Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
export type {
  MessageScrollerProviderProps,
  MessageScrollerItemProps,
  MessageScrollerButtonProps,
}
