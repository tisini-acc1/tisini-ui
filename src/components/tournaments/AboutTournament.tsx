import React from "react";

export const AboutTournament = () => {
  return (
    <section className="">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row lg:gap-x-[100px]">
          <div className="flex-1 order-1 lg:-order-1 flex justify-center mt-8 lg:mt-0">
            <div className="mx-auto h-[450] w-[600]">
              <img
                className="h-full rounded-lg shadow-lg"
                src=""
                alt="hero-image"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-end">
            <h2 className="title">Why Rausha Kipaji Cup</h2>
            <p className="text-[#71717a]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              molestias repellendus facere accusamus voluptatem illum doloremque
              voluptates, incidunt ut porro ex exercitationem qui nesciunt odit
              cumque iusto laboriosam ducimus facilis accusantium eveniet
              pariatur et saepe quo? Accusantium quia quas provident quam
              placeat, obcaecati quis quo quisquam! Saepe perferendis magnam
              earum vitae? Cumque expedita mollitia enim delectus et fugiat
              rerum nostrum adipisci numquam veritatis autem laboriosam,
              aspernatur corporis libero vel dolor quas alias, molestiae
              consequuntur dolorum. Minima perferendis harum, consequuntur ut
              facere magni quas soluta vel nisi rem voluptates ducimus dolorem
              tenetur. Sequi provident vel, reprehenderit ducimus vitae odio
              sunt laboriosam?
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
