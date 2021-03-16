import fs from "fs"
import path from "path"

import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"

export default function Post(params) {
  return (
    <Layout title={params.title}>
      <div className="post-meta">
        <span>{params.published}</span>
      </div>
      <div className="post-body"
        dangerouslySetInnerHTML={{ __html: params.content }}
      />
    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 * getStaticPaths()から返された pathsの要素をひとつ受け取り、ページに対応した値を返す
 * build時に各ページに対して、一度ずつ呼ばれる
 */
export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug })

  return {
    props: {
      ...content
    }
  }
}

/**
 * 有効な URL パラメータを全件返す
 * build時に全体で一度だけ呼ばれる
 */
export async function getStaticPaths() {
  const paths = listContentFiles({ fs })
    .map((filename) => ({
      params: {
        slug: path.parse(filename).name,
      }
    }))

  return { paths, fallback: false }
}

// // ダミーデータ
// async function readContentFile({ fs, slug }) {
//   return {
//     title: "竹取物語",
//     published: "2020/07/23",
//     content: "今は昔",
//   }
// }

// function listContentFiles({ fs }) {
//   return ["taketori.md"]
// }
