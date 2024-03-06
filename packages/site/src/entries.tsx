import { createPages } from "waku/router/server";
import { lazy } from "react";

import { blogData } from "note-site-data/blog";
import { memoData } from "note-site-data/memo";
import { tagData } from "../../data/tag";

const HomePage = lazy(() => import("./app/page"));
const BlogIndexPage = lazy(() => import("./app/blog/page"));
const BlogArticlePage = lazy(() => import("./app/blog/article/page"));
const MemoIndexPage = lazy(() => import("./app/memo/page"));
const MemoArticlePage = lazy(() => import("./app/memo/article/page"));
const TagPage = lazy(() => import("./app/tag/explore/page"));
const TagIndexPage = lazy(() => import("./app/tag/page"));
const NotFoundPage = lazy(() => import("./app/404"));
const AboutPage = lazy(() => import("./app/about/page"));

const RootLayout = lazy(() => import("./app/layout"));
const FooterLayout = lazy(() => import("./layout/with-footer"));
const MemoLayout = lazy(() => import("./app/memo/layout"));
const BlogLayout = lazy(() => import("./app/blog/layout"));

export default createPages(async ({ createPage, createLayout }) => {
  createLayout({
    render: "static",
    path: "/",
    component: RootLayout,
  });

  createPage({
    render: "static",
    path: "/",
    component: () => (
      <FooterLayout>
        <HomePage />
      </FooterLayout>
    ),
  });

  createPage({
    render: "static",
    path: "/about",
    component: () => (
      <FooterLayout>
        <AboutPage />
      </FooterLayout>
    ),
  });

  createLayout({
    render: "static",
    path: "/blog",
    component: BlogLayout,
  });

  createPage({
    render: "static",
    path: "/blog",
    component: () => (
      <FooterLayout>
        <BlogIndexPage />
      </FooterLayout>
    ),
  });

  createPage({
    render: "static",
    // render: "dynamic",
    path: "/blog/[slug]",
    staticPaths: blogData.paths.map((p) => p[0]),
    component: (props: { slug: string }) => (
      <FooterLayout>
        <BlogArticlePage slug={props.slug} />
      </FooterLayout>
    ),
  });

  createLayout({
    render: "static",
    path: "/memo",
    component: MemoLayout,
  });

  createPage({
    render: "static",
    path: "/memo",
    component: () => <MemoIndexPage />,
  });

  [...memoData.paths, ...memoData.folderPaths].forEach((path) => {
    createPage({
      render: "static",
      path: `/memo/${path.join("/")}`,
      component: () => <MemoArticlePage path={path} />,
    });
  });

  createPage({
    render: "static",
    path: "/tag",
    component: () => (
      <FooterLayout>
        <TagIndexPage />
      </FooterLayout>
    ),
  });

  tagData.tagList.forEach((path) => {
    createPage({
      render: "static",
      path: `/tag/${path.join("/")}`,
      component: () => (
        <FooterLayout>
          <TagPage path={path} />
        </FooterLayout>
      ),
    });
  });

  createPage({
    render: "static",
    path: "/404",
    component: () => (
      <FooterLayout>
        <NotFoundPage />
      </FooterLayout>
    ),
  });
});
