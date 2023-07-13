/**
 * @author [Felix Orinda]
 * @email [forinda82@gmail.com]
 * @create date 2023-07-08 20:29:00
 * @modify date 2023-07-08 20:29:39
 * @desc [description]
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import authOptions from "@/lib/auth/authOptions";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { getServerSession } from "next-auth";

const  Homepage = async() => {
  const serverSession = await getServerSession(authOptions);
  return (
    <main className="">
      <MainHeader />
      <div className="flex flex-col items-center px-4 py-16 mx-auto sm:justify-between sm:py-24 md:px-8 lg:px-16 max-w-7xl">
        {/* Hero section */}
        <div className="flex flex-col items-center justify-center w-full h-full py-8"></div>
        {/* Header section */}
        {
          JSON.stringify(serverSession)
        }
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col h-full">
            <div className="h-1/2">
              <Image
                src="/player.jpg"
                alt="hero"
                className=" inset-0 object-cover w-full h-full"
                width={500}
                height={500}
              />
            </div>
            <div className="px-4 py-2">
              <h1 className="text-lg font-bold text-primary">
                Sergio Rico was trampled by a horse. This is the incredible
                story of how he cheated death Sergio Rico was trampled by a
                horse. This is the incredible story of how he cheated death
              </h1>
              <p>
                After winning Ligue 1, Sergio Rico travelled to El Rocio for a
                religious festival – where a tragic accident left him fighting
                for his life
              </p>
              <div className="flex items-center gap-2 py-2">
                <div>Brian Omondi</div>
                <div className="flex items-center relative">
                  <FontAwesomeIcon icon={faMessage} />
                  <span className="text-sm font-bold text-primary absolute top-1 -right-5 border rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i*50}
                className="border-b grid grid-cols-[2fr_1fr] gap-2 p-2"
              >
                <div className="relative ">
                  <h1 className="text-sm font-semibold font-roboto text-primary">
                    How Guler fits in to Real Madrids team - and their
                    youth-first transfer policy Guillermo Rai68 How Guler fits
                    in to Real Madrids team - and their youth-first transfer
                    policy
                  </h1>
                  <hr />
                  <div className="flex items-center gap-2 text-sm">
                    <div>Brian Omondi</div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faMessage} />
                      <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Image
                    src="/p2.jpg"
                    alt="hero"
                    className="inset-0 object-cover"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Col 3 */}
          <div className="p-2 border-l">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold text-primary">Headlines</h1>
              <button className="text-sm font-semibold text-primary">
                See all
              </button>
            </div>
            <hr />
            <ul className="flex flex-col gap-4 ml-2 px-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i*10} className="list-disc">
                  PSG give Mbappe deadline for decision on future in three-page
                  letter
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className=" w-full my-4 border-t border-gray-300 sm:block" />
        {/* Spotlight */}
        <div className="flex flex-col justify-center w-full h-full">
          <div className="py-4 text-left">
            <h1 className="text-lg font-bold text-primary">Spotlight</h1>
          </div>
          <div className="grid  p-2 md:grid-cols-2">
            {/* Col 1 */}
            <div>
              <div className="h-1/2">
                <Image
                  src="/player.jpg"
                  alt="hero"
                  className=" inset-0 object-cover w-full h-full"
                  width={500}
                  height={500}
                />
              </div>
              <div className="px-4 py-2">
                <h1 className="text-lg font-bold text-primary">
                  Sergio Rico was trampled by a horse. This is the incredible
                  story of how he cheated death Sergio Rico was trampled by a
                  horse. This is the incredible story of how he cheated death
                </h1>
                <p>
                  After winning Ligue 1, Sergio Rico travelled to El Rocio for a
                  religious festival – where a tragic accident left him fighting
                  for his life
                </p>
                <div className="flex items-center gap-2 py-2">
                  <div>Brian Omondi</div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMessage} />
                    <span>2</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i*30}
                    className="border-b grid grid-cols-[1fr_2fr] gap-2 p-2"
                  >
                    <div className="">
                      <Image
                        src="/p2.jpg"
                        alt="hero"
                        className="inset-0 object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="relative ">
                      <h1 className="text-sm font-semibold font-roboto text-primary">
                        How Guler fits in to Real Madrids team - and their
                        youth-first transfer policy Guillermo Rai68 How Guler
                        fits in to Real Madrids team - and their youth-first
                        transfer policy
                      </h1>
                      <hr />
                      <div className="flex items-center gap-2 text-sm">
                        <div>Brian Omondi</div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMessage} />
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className=" w-full my-4 border-t border-gray-300 sm:block" />
         {/* Club deals */}
         <div className="flex flex-col justify-center w-full h-full">
          <div className="py-4 text-left">
            <h1 className="text-lg font-bold text-primary">Club deals</h1>
          </div>
          <div className="grid  p-2 md:grid-cols-2">
            {/* Col 1 */}
            <div>
              <div className="h-1/2">
                <Image
                  src="/player.jpg"
                  alt="hero"
                  className=" inset-0 object-cover w-full h-full"
                  objectFit="cover"
                  width={500}
                  height={500}
                />
              </div>
              <div className="px-4 py-2">
                <h1 className="text-lg font-bold text-primary">
                  Sergio Rico was trampled by a horse. This is the incredible
                  story of how he cheated death Sergio Rico was trampled by a
                  horse. This is the incredible story of how he cheated death
                </h1>
                <p>
                  After winning Ligue 1, Sergio Rico travelled to El Rocio for a
                  religious festival – where a tragic accident left him fighting
                  for his life
                </p>
                <div className="flex items-center gap-2 py-2">
                  <div>Brian Omondi</div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMessage} />
                    <span>2</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i*40}
                    className="border-b grid grid-cols-[1fr_2fr] gap-2 p-2"
                  >
                    <div className="">
                      <Image
                        src="/p2.jpg"
                        alt="hero"
                        className="inset-0 object-cover"
                        width={500}
                        height={500}
                        objectFit="cover"
                      />
                    </div>
                    <div className="relative ">
                      <h1 className="text-sm font-semibold font-roboto text-primary">
                        How Guler fits in to Real Madrids team - and their
                        youth-first transfer policy Guillermo Rai68 How Guler
                        fits in to Real Madrids team - and their youth-first
                        transfer policy
                      </h1>
                      <hr />
                      <div className="flex items-center gap-2 text-sm">
                        <div>Brian Omondi</div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMessage} />
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </main>
  );
};

export default Homepage;
