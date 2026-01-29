import Image from "next/image";
import { motion } from "framer-motion";
import { mockArticles } from "@/data/mockArticles";
import { usePathname, useRouter } from "next/navigation";

// ============================================================================
// MAIN ARTICLE GRID COMPONENT
// ============================================================================
export const MainArticleGrid = () => {
  const pathname = usePathname();
  const router = useRouter();
  const articleId = Number(pathname.split("/").pop());

  const article = mockArticles.find((article) => article.id === articleId);

  if (!article) {
    return (
      <div className="text-white text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <p className="mb-6">The article you are looking for does not exist.</p>
        <button
          onClick={() => router.push("/article")}
          className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  const articleCouncil = article?.council;

  const otherArticles = mockArticles.filter(
    (article) => article.id !== articleId
  );
  const relatedArticles = otherArticles
    .filter((article) => article.council === articleCouncil)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Hero Image */}
      <div className="col-span-3 bg-gray-300 h-100 rounded-3xl overflow-hidden relative">
        <Image
          src={article.img_url || "/ArticlePics/ArticleBigImage.png"}
          alt={article.title}
          fill
          objectFit="cover"
        />
      </div>

      {/* Article Content */}
      <div className="col-span-2 row-span-2 space-y-3">
        {article.sections && article.sections.length > 0 ? (
          article.sections.map((section, index) => {
            switch (section.type) {
              case "text":
                return (
                  <p key={index} className="font-medium text-md">
                    {section.content}
                  </p>
                );

              case "heading":
                return (
                  <div key={index} className="space-y-3">
                    <h1 className="text-3xl font-bold">{section.heading}</h1>
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
          <p className="text-white/60">No content available for this article.</p>
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
      <div>
        <h1 className="text-xl font-bold mb-4">Table of Contents</h1>
        {article.tableOfContents && article.tableOfContents.length > 0 ? (
          <ul className="space-y-3">
            {article.tableOfContents.map((item, index) => (
              <li key={index} className="list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/60 text-sm">No table of contents available</p>
        )}
      </div>

      {/* Related Articles */}
      <div className="h-full">
        <h1 className="text-xl font-bold mb-4">Related Articles</h1>
        {relatedArticles.length > 0 ? (
          relatedArticles.map((relatedArticle) => (
            <div
              className="relative flex flex-col gap-4 mb-4 rounded-xl p-2 cursor-pointer group transition-all duration-300"
              key={relatedArticle.id}
              onClick={() => router.push(`/article/${relatedArticle.id}`)}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/6"></div>

              <div className="h-40 rounded-xl overflow-hidden relative z-10">
                <Image
                  src={relatedArticle.img_url}
                  alt={relatedArticle.title}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="text-white flex flex-col gap-3 z-10">
                <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit">
                  {relatedArticle.title}
                </p>
                <div className="flex items-center gap-3">
                  <p>{relatedArticle.read_min}</p>
                  <div className="flex gap-2 items-center">
                    <img src="/ArticlePics/note.svg" alt="" />
                    <p>{relatedArticle.date}</p>
                  </div>
                </div>
                <p>{relatedArticle.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/60 text-sm">No related articles found</p>
        )}
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
      <div className="flex gap-3 items-center w-fit my-8">
        <div className="size-10 relative rounded-full overflow-hidden">
          <Image
            src="/ArticlePics/computer.png"
            alt="Image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-lg">
            {article.author || "Unknown Author"}
          </p>
          <p>{article.role || "Contributor"}</p>
        </div>
      </div>
      <div className="my-5 flex items-center gap-2 justify-end">
        <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit">
          {article.title}
        </p>
        <div className="w-4 h-[1px] bg-white rotate-90"></div>
        <div className="flex gap-2 items-center">
          <img src="/ArticlePics/note.svg" alt="" />
          <p>{article.date}</p>
        </div>
        <div className="w-4 h-[1px] bg-white rotate-90"></div>
        <p>{article.read_min}</p>
      </div>
    </>
  );
};

// ============================================================================
// MAIN LATEST ARTICLES COMPONENT
// ============================================================================
export const MainLatestArticles = () => {
  const pathname = usePathname();
  const router = useRouter();
  const articleId = Number(pathname.split("/").pop());

  const otherArticles = mockArticles.filter(
    (article) => article.id !== articleId
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
          otherArticles.slice(0, 4).map((article) => (
            <div
              className="relative flex flex-col gap-4 mb-4 rounded-xl p-2 cursor-pointer group transition-all duration-300"
              key={article.id}
              onClick={() => router.push(`/article/${article.id}`)}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/6"></div>
              <div className="h-40 rounded-xl overflow-hidden relative z-10">
                <Image
                  src={article.img_url}
                  alt={article.title}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="text-white flex flex-col gap-3 z-10">
                <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit">
                  {article.title}
                </p>
                <div className="flex items-center gap-3">
                  <p>{article.read_min}</p>
                  <div className="flex gap-2 items-center">
                    <img src="/ArticlePics/note.svg" alt="" />
                    <p>{article.date}</p>
                  </div>
                </div>
                <p>{article.description}</p>
              </div>
            </div>
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