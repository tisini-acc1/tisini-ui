import { Link } from "react-router-dom";

import CategoryHeader from "./CategoryHeader";

const CategoryGrid = () => {
  return (
    <div className="w-full">
      <CategoryHeader category="Football" />

      <div className="mb-5 w-full h-48 overflow-hidden relative">
        <img
          src="src/assets/tournaments/hero.jpg"
          alt=""
          className="w-full object-cover cursor-pointer hover:scale-110 transition"
        />

        <div className="absolute bottom-0 left-0 flex flex-col bg-black-lighter/40 pt-1 h-[4.8rem]">
          <ul className="flex items-center gap-3 text-white text-xs font-semibold ml-4 hover:text-primary cursor-pointer">
            <li>John Doe</li>
            <li>26 September 2023</li>
          </ul>
          <h3 className="px-4 py-2 text-white text-xs font-semibold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius autem
            aut quo ad velit reiciendis asperiores nihil quam rerum nam, placeat
            mollitia dolorum, aperiam officia?
          </h3>
        </div>
      </div>

      <Link to={""}>
        <div className="flex items-center gap-4 pt-5 border-t border-primary-lightest mt-5">
          <ArticleGrid img={"public/p2.jpg"} />
          <ArticleGrid img={"public/player.jpg"} />
        </div>

        <div className="flex items-center gap-4 pt-5 border-t border-primary-lightest mt-5">
          <ArticleGrid img={"src/assets/tournaments/faqs.jpg"} />
          <ArticleGrid
            img={"src/assets/tournaments/Partially removed BG.png"}
          />
        </div>
      </Link>
    </div>
  );
};

type GridProps = {
  img: string;
};

const ArticleGrid = ({ img }: GridProps) => {
  return (
    <div className="flex flex-col w-1/2">
      <Link to={""} className="w-full space-y-2">
        <img
          src={img}
          alt=""
          className="w-full h-32 object-cover hover:scale-110 transition"
        />

        <ul className="flex items-center justify-between text-gray-400 text-xs font-semibold  hover:text-primary cursor-pointer mb-2">
          <li>John Doe</li>
          <li>26 September 2023</li>
        </ul>

        <h3 className="text-gray-600 text-xs font-semibold transition-all hover:text-primary cursor-pointer overflow-hidden text-ellipsis line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius autem
          aut quo ad velit
        </h3>
      </Link>
    </div>
  );
};

export default CategoryGrid;
