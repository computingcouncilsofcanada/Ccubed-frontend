// This is the Our Teams page

import React from 'react'
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";

function OurTeamsPage() {
  return (
    <>
      <BgBoxMainPage maxHeight={100} />
      <div className="relative w-full overflow-x-hidden -mt-30 pt-20">
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-3xl text-white">Our Teams</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default OurTeamsPage