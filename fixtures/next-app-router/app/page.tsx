import { AspectRatio } from "@mivama/ui/aspect-ratio"
import { Badge } from "@mivama/ui/badge"
import { BentoGrid, BentoGridItem } from "@mivama/ui/bento-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@mivama/ui/breadcrumb"
import { Bubble, BubbleContent, BubbleGroup } from "@mivama/ui/bubble"
import { ButtonGroup } from "@mivama/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mivama/ui/card"
import { Container } from "@mivama/ui/container"
import { EditorialGrid } from "@mivama/ui/editorial-grid"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@mivama/ui/empty"
import { Item, ItemDescription, ItemGroup, ItemTitle } from "@mivama/ui/item"
import { Kbd, KbdGroup } from "@mivama/ui/kbd"
import { Label } from "@mivama/ui/label"
import { Marker } from "@mivama/ui/marker"
import { Message, MessageContent, MessageHeader } from "@mivama/ui/message"
import { NativeSelect } from "@mivama/ui/native-select"
import { ScrollLayer, ScrollScene } from "@mivama/ui/scroll-scene"
import { Section } from "@mivama/ui/section"
import { Separator } from "@mivama/ui/separator"
import { Skeleton } from "@mivama/ui/skeleton"
import { Spinner } from "@mivama/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mivama/ui/table"
import { Heading, Text } from "@mivama/ui/typography"

import { ClientShowcase } from "../components/client-showcase"

export default function Page() {
  return (
    <Container className="mx-auto grid min-h-screen max-w-5xl gap-10 p-8">
      <header className="grid gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Server Component</Badge>
          <Spinner />
        </div>
        <Heading variant="display" className="text-3xl font-semibold">
          Next App Router consumer
        </Heading>
        <Text>
          This route imports server-compatible Mivama UI subpaths without a
          client directive.
        </Text>
      </header>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Consumer Proof</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Section density="default">
        <div className="mb-4">
          <Heading variant="title">Layout Primitives</Heading>
          <Text variant="meta">
            Bento and Editorial grids render on the server.
          </Text>
        </div>
        <EditorialGrid>
          <div className="col-span-full rounded-xl border border-border p-6">
            EditorialGrid renders directly in the server component tree.
          </div>
        </EditorialGrid>
      </Section>

      <BentoGrid>
        <BentoGridItem span={2} className="rounded-xl border border-border p-6">
          BentoGrid and BentoGridItem remain server-compatible.
        </BentoGridItem>
        <BentoGridItem className="rounded-xl border border-border p-6">
          Public subpath imports resolve from the packed distribution.
        </BentoGridItem>
      </BentoGrid>

      <ScrollScene>
        <ScrollLayer className="rounded-xl border border-border p-6">
          ScrollScene renders without browser APIs during the server build.
        </ScrollLayer>
      </ScrollScene>

      <Card>
        <CardHeader>
          <CardTitle>Server Primitives Matrix</CardTitle>
          <CardDescription>
            Aspect ratio, empty, item, kbd, marker, and native select.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="w-48">
            <AspectRatio
              ratio={16 / 9}
              className="flex items-center justify-center rounded-md bg-muted"
            >
              <Text className="text-xs text-muted-foreground">
                16:9 Aspect Ratio
              </Text>
            </AspectRatio>
          </div>

          <BubbleGroup>
            <Bubble>
              <BubbleContent>Server rendered chat bubble</BubbleContent>
            </Bubble>
          </BubbleGroup>

          <ButtonGroup>
            <Badge>Grouped</Badge>
            <Badge variant="outline">Badges</Badge>
          </ButtonGroup>

          <Empty>
            <EmptyHeader>
              <EmptyTitle>Empty State Title</EmptyTitle>
              <EmptyDescription>
                Demonstrating server-safe Empty module
              </EmptyDescription>
            </EmptyHeader>
          </Empty>

          <ItemGroup>
            <Item>
              <ItemTitle>Item Title</ItemTitle>
              <ItemDescription>Item description text</ItemDescription>
            </Item>
          </ItemGroup>

          <div className="flex items-center gap-2">
            <Text>Press</Text>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            <Text>or</Text>
            <Marker>highlighted text</Marker>
          </div>

          <div className="grid gap-2 max-w-xs">
            <Label htmlFor="native-select-demo">Native Select</Label>
            <NativeSelect id="native-select-demo">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </NativeSelect>
          </div>

          <Message>
            <MessageHeader>Server Notice</MessageHeader>
            <MessageContent>Standard message container</MessageContent>
          </Message>

          <Separator />

          <Skeleton className="h-8 w-full" />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell>Server Ready</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Text className="text-xs text-muted-foreground">
            Server validation complete
          </Text>
        </CardFooter>
      </Card>

      <ClientShowcase />
    </Container>
  )
}
