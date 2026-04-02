import Image from "next/image";
import { motion } from "framer-motion";
import { mockArticles } from "@/data/mockArticles";
import { usePathname } from "next/navigation";
import ArticleCard from "./ArticleCard";

// ============================================================================
// MAIN ARTICLE GRID COMPONENT
// ============================================================================
export const MainArticleGrid = () => {
  const pathname = usePathname();
  const articleId = Number(pathname.split("/").pop() || 0);

  const article = mockArticles.find((article) => article.id === articleId);

  if (!article) {
    return (
      <div className="text-white text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <p className="mb-6">The article you are looking for does not exist.</p>
        {/* <button
          onClick={() => router.push("/article")}
          className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
        >
          Back to Articles
        </button> */}
      </div>
    );
  }

  const articleCouncil = article?.council;

  const otherArticles = mockArticles.filter(
    (article) => article.id !== articleId,
  );
  const relatedArticles = otherArticles
    .filter((article) => article.council === articleCouncil)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Hero Image */}
      <div className="col-span-1 lg:col-span-3 bg-gray-300 h-100 rounded-3xl overflow-hidden relative">
        <Image
          src={article.img_url || "/ArticlePics/ArticleBigImage.png"}
          alt={article.title}
          fill
          objectFit="cover"
        />
      </div>

      {/* Article Content */}
      <div className="lg:col-span-2 space-y-3">
        {article.sections && article.sections.length > 0 ? (
          article.sections.map((section, index) => {
            switch (section.type) {
              case "text": {
                if (section.content?.trim().startsWith('"')) {
                  const lastQuoteIndex = section.content.lastIndexOf('"');
                  if (lastQuoteIndex > 0) {
                    const quotePart = section.content.substring(0, lastQuoteIndex + 1);
                    const authorPart = section.content.substring(lastQuoteIndex + 1);
                    return (
                      <p key={index} className="font-medium mt-5 text-md text-white/85">
                        <span className="italic">{quotePart}</span>
                        {authorPart}
                      </p>
                    );
                  }
                }
                return (
                  <p key={index} className="font-medium mt-5 text-md">
                    {section.content}
                  </p>
                );
              }

              case "heading":
                return (
                  <div key={index} className="space-y-3">
                    <h1
                      id={`heading-${index}`}
                      className="text-3xl font-bold scroll-mt-24 my-7 text-[#FAA336]"
                    >
                      {section.heading}
                    </h1>
                    {section.content && (
                      <p className="font-medium text-md">{section.content}</p>
                    )}
                  </div>
                );

              case "list":
                return (
                  <ul key={index}>
                    {section.items?.map((item, i) => (
                      <li key={i} className="list-disc list-inside">
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              case "images":
                return (
                  <div key={index} className="flex gap-5">
                    {section.images?.map((img, i) => (
                      <div
                        key={i}
                        className="w-80 h-40 relative rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt="Article image"
                          fill
                          objectFit="cover"
                        />
                      </div>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })
        ) : (
          <p className="text-white/60">
            No content available for this article.
          </p>
        )}

        {/* Share Section */}
        {article.shareLinks && article.shareLinks.length > 0 && (
          <div className="flex items-center gap-2">
            <p>Share with </p>
            <div className="flex gap-4">
              {article.shareLinks.map((link) => (
                <a href={link.url} key={link.icon.split("/")[3]}>
                  <img src={link.icon} alt={link.icon.split("/")[3]} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <div className="flex flex-col gap-8 self-start">
        <div>
          <h1 className="text-xl font-bold mb-4">Table of Contents</h1>
          {article.tableOfContents && article.tableOfContents.length > 0 ? (
            <ul className="space-y-3">
              {article.tableOfContents.map((item, index) => (
                <li key={index} className="list-disc list-inside">
                  <a
                    href={`#heading-${article.sections?.findIndex(
                      (s) => s.type === "heading" && s.heading === item,
                    )}`}
                    className="hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/60 text-sm">
              No table of contents available
            </p>
          )}
        </div>

        {/* Related Articles */}
        <div className="h-full">
          <h1 className="text-xl font-bold mb-4">Related Articles</h1>
          {relatedArticles.length > 0 ? (
            relatedArticles.map((relatedArticle) => (
              <ArticleCard article={relatedArticle} key={relatedArticle.id} />
            ))
          ) : (
            <p className="text-white/60 text-sm">No related articles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN ARTICLE HEADER COMPONENT
// ============================================================================
export const MainArticleHeader = () => {
  const pathname = usePathname();
  const articleId = Number(pathname.split("/").pop());

  const article = mockArticles.find((article) => article.id === articleId);

  if (!article) {
    return null;
  }

  return (
    <>
      <h1 className="text-6xl font-bold max-w-[900px] mt-10">
        {article.title}
      </h1>

      {/* Unified byline bar: author left, metadata right */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-6 pt-5 border-t border-white/10">
        {/* Author info */}
        {article.author && (
          <div className="flex gap-3 items-center">
            {/* Author avatar or fallback pen icon */}
            {article.author_img_url ? (
              <div className="size-10 relative rounded-full overflow-hidden ring-2 ring-white/15">
                <Image
                  src={article.author_img_url}
                  alt={article.author}
                  fill
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/60">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-[11px] uppercase tracking-widest text-white/40 font-medium leading-tight">
                Written by
              </p>
              <p className="font-semibold text-[15px] text-white leading-tight mt-0.5">
                {article.author}
              </p>
              {article.role && (
                <p className="text-[13px] text-white/50 leading-tight mt-0.5">
                  {article.role}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Article metadata */}
        <div className="flex items-center gap-2 text-sm text-white/70">
          <p className="px-3 py-1 bg-[#D4D4D4]/10 rounded-2xl">
            {article.tag}
          </p>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <div className="flex gap-1.5 items-center">
            <img src="/ArticlePics/note.svg" alt="" className="w-4 h-4 opacity-60" />
            <p>{article.date}</p>
          </div>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <p>{article.read_min}</p>
        </div>
      </div>
    </>
  );
};

// ============================================================================
// MAIN LATEST ARTICLES COMPONENT
// ============================================================================
export const MainLatestArticles = () => {
  const pathname = usePathname();
  const articleId = Number(pathname.split("/").pop());

  const otherArticles = mockArticles.filter(
    (article) => article.id !== articleId,
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left my-16 flex flex-col gap-3"
      >
        <div className="">
          <h1
            className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] tracking-[0.01em] font-extrabold text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Latest Articles
          </h1>
        </div>

        <p
          className="text-white text-left text-lg font-light w-full max-w-[80ch]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Discover articles crafted by the council, covering key issues and
          decisions. Get clear, reliable information to understand what&apos;s
          happening behind the scenes.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4"
      >
        {otherArticles.length > 0 ? (
          otherArticles
            .slice(0, 4)
            .map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))
        ) : (
          <div className="col-span-full text-center text-white/60 py-8">
            <p>No other articles available at the moment.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
