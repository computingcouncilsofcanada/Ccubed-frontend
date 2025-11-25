import Image from "next/image"


export const MainArticleGrid = () => {
    return (
        <div className="grid grid-cols-3 gap-8">
        {/* <!-- Row 1 (full width) --> */}
        <div className="col-span-3 bg-gray-300 h-100 rounded-3xl overflow-hidden relative">
          <Image
            src="/ArticlePics/ArticleBigImage.png"
            alt="Image"
            fill
            objectFit="cover"
          ></Image>
        </div>

        {/* <!-- Left side (tall column: covers row 2 + row 3) --> */}
        <div className="col-span-2 row-span-2 space-y-3 ">
          <p className="font-medium text-md">
            Artificial Intelligence is no longer a futuristic idea from sci-fi
            movies — it has become one of the most transformative forces
            shaping our daily lives, industries, and the way we create, learn,
            and work. From smart assistants to advanced design tools, AI is
            redefining how we express ideas, solve problems, and build digital
            experiences.
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">What Exactly is AI?</h1>
            <p className="font-medium text-md">
              At its core, AI is a set of algorithms and models designed to
              mimic human intelligence. It can analyze massive amounts of
              data, recognize patterns, predict outcomes, and even make
              decisions with minimal human input. Unlike traditional software,
              which only follows predefined rules, AI systems learn and
              improve over time.
            </p>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Why AI Matters Today?</h1>
            <p className="font-medium text-md">
              Over the past decade, AI has moved from research labs into the
              heart of modern life. Companies rely on AI to automate tasks,
              enhance customer experiences, and create personalized products.
              Designers and developers use AI to accelerate their workflows —
              from generating layouts and content to simulating user behavior.
            </p>
            <p className="font-medium text-md">
              AI matters because it's evolving faster than any previous
              technology, and it's unlocking opportunities that were
              impossible just a few years ago.
            </p>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">AI in Everyday Life</h1>
            <div>
              <p className="font-medium text-md">
                Whether we realize it or not, AI is everywhere:
              </p>
              <ul>
                <li className="list-disc list-inside">
                  Smartphones use AI for facial recognition, voice assistants,
                  and battery optimization.
                </li>
                <li className="list-disc list-inside">
                  Social media platforms rely on AI for content
                  recommendations and detecting harmful content.
                </li>
                <li className="list-disc list-inside">
                  Navigation apps use AI to analyze traffic, weather, and road
                  patterns.
                </li>
                <li className="list-disc list-inside">
                  E-commerce uses AI to personalize product suggestions.
                </li>
              </ul>
              <p className="font-medium text-md">
                Even creative fields are being reshaped — illustrators, UI/UX
                designers, and video editors now collaborate with AI tools to
                generate ideas, speed up workflows, and push creative
                boundaries further than ever.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">The Rise of Generative AI</h1>
            <div className="flex gap-5">
              <div className="w-80 h-40 relative rounded-2xl overflow-hidden">
                <Image
                  src="/ArticlePics/ArticleBigImage.png"
                  alt="Image"
                  fill
                  objectFit="cover"
                ></Image>
              </div>
              <div className="w-80 h-40 relative rounded-2xl overflow-hidden">
                <Image
                  src="/ArticlePics/ArticleBigImage.png"
                  alt="Image"
                  fill
                  objectFit="cover"
                ></Image>
              </div>
            </div>
            <div>
              <p className="font-medium text-md">
                AI is not here to replace human talent — it's here to augment
                it. Instead of doing repetitive tasks, people can now focus on
                strategy, creativity, leadership, and emotional intelligence.
              </p>
              <p className="font-medium text-md">
                Many industries are evolving:
              </p>
              <ul>
                <li className="list-disc list-inside">
                  Healthcare uses AI for early diagnosis and personalized
                  treatments.
                </li>
                <li className="list-disc list-inside">
                  Finance relies on AI for fraud detection and market
                  predictions.
                </li>
                <li className="list-disc list-inside">
                  Education adopts AI-powered learning systems tailored to
                  each student.
                </li>
                <li className="list-disc list-inside">
                  Design and development leverage AI to automate code
                  generation, test usability, and create accessible
                  interfaces.
                </li>
              </ul>
              <p className="font-medium text-md">
                The most successful professionals will be those who can
                combine human intuition with AI-driven insights.
              </p>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">
                The Rise of Generative AI
              </h1>
              <div>
                <p className="font-medium text-md">
                  AI is not here to replace human talent — it's here to
                  augment it. Instead of doing repetitive tasks, people can
                  now focus on strategy, creativity, leadership, and emotional
                  intelligence.
                </p>
                <p className="font-medium text-md">
                  Many industries are evolving:
                </p>
                <ul>
                  <li className="list-disc list-inside">
                    Healthcare uses AI for early diagnosis and personalized
                    treatments.
                  </li>
                  <li className="list-disc list-inside">
                    Finance relies on AI for fraud detection and market
                    predictions.
                  </li>
                  <li className="list-disc list-inside">
                    Education adopts AI-powered learning systems tailored to
                    each student.
                  </li>
                  <li className="list-disc list-inside">
                    Design and development leverage AI to automate code
                    generation, test usability, and create accessible
                    interfaces.
                  </li>
                </ul>
                <p className="font-medium text-md">
                  The most successful professionals will be those who can
                  combine human intuition with AI-driven insights.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p>Share with </p>
            <div className="flex gap-4">
              <img src="/ArticlePics/icons/Discord.svg" alt="" />
              <img src="/ArticlePics/icons/Instagram.svg" alt="" />
              <img src="/ArticlePics/icons/Facebook.svg" alt="" />
              <img src="/ArticlePics/icons/Twitch.svg" alt="" />
              <img src="/ArticlePics/icons/Twitter.svg" alt="" />
            </div>
          </div>
        </div>

        {/* <!-- Row 2 right small box --> */}
        <div>
          <div>
            <h1 className="text-xl font-bold mb-4">Table of Contents</h1>
            <ul className="space-y-3">
              <li className="list-disc list-inside">What Exactly is AI?</li>
              <li className="list-disc list-inside">
                The Rise of Generative AI
              </li>
              <li className="list-disc list-inside">Why AI Matters Today</li>
              <li className="list-disc list-inside">AI in Everyday Life</li>
            </ul>
          </div>
        </div>

        {/* <!-- Row 3 right box --> */}
        <div className=" h-full">
        <h1 className="text-xl font-bold mb-4">Related Articles</h1>
          {Array.from({ length: 4 }, (_v, index) => (
            <div className=" flex flex-col gap-4 mb-4" key={index}>
              <div className="h-40 rounded-xl overflow-hidden relative">
                <Image
                  src="/ArticlePics/computer.png"
                  alt="computer"
                  fill
                  objectFit="cover"
                ></Image>
              </div>
              <div className="text-white flex flex-col gap-3">
                <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
                  Information Security
                </p>
                <div className="flex items-center gap-3">
                  <p>7 mins read</p>
                  <div className="flex gap-2 items-center">
                    <img src="/ArticlePics/note.svg" alt="" />
                    <p>Nov 21, 2025</p>
                  </div>
                </div>
                <p>Top Cyber Threats Every User Should Watch Out For</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}