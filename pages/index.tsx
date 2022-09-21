import * as React from "react"
import fs from "fs"
import { getMDXComponent } from "mdx-bundler/client"
import { InferGetStaticPropsType } from "next"
import path from "path"
import Image from "next/image"

import { getAllPostsMeta, loadMDX } from "utils/loadMDX"

export const getStaticProps = async () => {
  const file = path.resolve(process.cwd(), "content", "home.mdx")
  const source = fs.readFileSync(file, "utf-8")

  const { code } = await loadMDX(source)
  const posts = await getAllPostsMeta()

  return { props: { code, posts } }
}

const mdxComponents = { ...components, Experience, Spacer, Image, MyPic }

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ code, posts }: Props) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <article className="max-w-[75ch] mx-auto pt-12 pb-28 px-5">
      <Component components={mdxComponents} />
    </article>
  )
}
