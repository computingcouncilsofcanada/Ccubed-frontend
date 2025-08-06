// This is the members page

import React from 'react'
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";

function MemberPage() {
  return (
    <>
      <BgBoxMainPage maxHeight={100} />
      <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden -mt-30 pt-20">
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl text-white">Members Page</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MemberPage