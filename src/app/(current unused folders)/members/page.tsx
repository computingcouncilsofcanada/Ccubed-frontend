// This is the members page

import React from 'react'
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";

function MemberPage() {
  return (
    <>
      <BgBoxMainPage maxHeight={30} />
      <div className="min-h-screen relative z-10">
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl text-white">Members Page</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MemberPage