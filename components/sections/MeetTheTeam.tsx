import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/components/ui/SanityImage";
import type { TeamMember } from "@/types";

export async function MeetTheTeam() {
  const team = await client.fetch<TeamMember[]>(teamMembersQuery);

  if (team.length === 0) return null;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center font-serif text-4xl italic text-on-light">
          Meet the Team
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member._id} className="flex flex-col items-center gap-3 text-center">
              {member.photo && (
                <div className="relative h-28 w-28 overflow-hidden rounded-full">
                  <SanityImage
                    src={urlForImage(member.photo).width(224).height(224).url()}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-serif text-xl italic text-on-light">{member.name}</h3>
                <span className="font-sans text-xs uppercase tracking-wide text-accent">
                  {member.role}
                </span>
              </div>
              {member.bio && (
                <p className="max-w-xs font-sans text-sm text-on-light/70">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
