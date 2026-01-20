type SubscriberPostCardProps = {
  title: string
  excerpt: string
  publishedAt: string
}

export default function SubscriberPostCard({
  title,
  excerpt,
  publishedAt,
}: SubscriberPostCardProps) {
  return (
    <article className="rounded-xl border p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
      <time className="mt-3 block text-xs text-muted-foreground">
        {publishedAt}
      </time>
    </article>
  )
}
