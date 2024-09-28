import { tisiniAxios } from "@/lib/api";
import { CategoriesWithPostType, PaginatedResponse } from "@/lib/types";
import { AxiosError } from "axios";
import React, { useState } from "react";

export default function useEditorArticles() {
  const [isLoading, setIsLoading] = useState(false);
  const [err] = useState("");
  const [data, setData] = useState<CategoriesWithPostType[]>([]);

  const fetchArticles = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = (await tisiniAxios.get("/blogs/article_editor_pick/"))
        .data as PaginatedResponse<CategoriesWithPostType>;
      setData(response.results);
    } catch (err) {
      // console.log(err);
      if (err instanceof AxiosError) {
        //
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  const refreshData = async () => {
    await fetchArticles();
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);
  return {
    data,
    isLoading,
    err,
    refreshData,
  };
}
