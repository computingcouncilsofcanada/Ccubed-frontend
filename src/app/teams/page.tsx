"use client";

import React, { useState, useMemo } from "react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import Footer from "@/components/shared/Footer";
import { mockMembers } from "@/data/mockMembers";
import TeamCard from "@/components/essentials/TeamCard";
import TeamFilterBar from "./components/TeamFilterBar";
import TeamCardV2 from "@/components/essentials/TeamCardV2";

function OurTeamsPage() {
  const [teamType, setTeamType] = useState<string>("board_of_advisors");

  // Group filtered members by their original team
  const groupedFilteredMembers = useMemo(() => {
    // if (teamType === "fullteam") {
    //   return mockMembers;
    // }

    const grouped = mockMembers
      .map((team) => ({
        ...team,
        members: team.members.filter((member) => member.category === teamType),
      }))
      .filter((team) => team.members.length > 0);

    return grouped;
  }, [teamType]);

  return (
    <>
      <BgBoxMainPage maxHeight={100} />
      <div className="relative w-full overflow-hidden -mt-30 pt-20">
        <div className="text-center min-h-screen">
          <h1 className="text-[40px] text-white font-bold leading-[48px] mt-[43px]">
            Meet Our Team
          </h1>
          <p className="font-light text-[18px] leading-[27px] text-white mt-[27px]">
            Meet our diverse team of world-class creators, designers, and
            problem solvers
          </p>
          <TeamFilterBar teamType={teamType} onTeamTypeChange={setTeamType} />

          <div className="flex flex-wrap justify-center mt-8">
            {groupedFilteredMembers.map((team) => (
              <div key={team.team} className="w-full mb-16">
                <h2 className="text-white font-semibold text-[32px] mb-[64px] mt-[38px]">
                  {team.team}
                </h2>

                {/* <div className="flex flex-wrap justify-center gap-9 gap-y-17">
                  {team.members.map((member) => (
                    <TeamCard
                      key={member.id}
                      imageUrl={member.imageUrl}
                      name={member.name}
                      role={member.role}
                      info={member.info}
                      linkedin={member.social.linkedin}
          
                    />
                  ))}
                </div> */}
                {/* <div className="h-20"/> */}
                <div className="flex flex-wrap justify-center gap-9 gap-y-17">
                  {team.members.map((member) => (
                    <TeamCardV2
                      key={member.id}
                      imageUrl={member.imageUrl}
                      name={member.name}
                      role={member.role}
                      info={member.info}
                      linkedin={member.social.linkedin}
          
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

 
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OurTeamsPage;
