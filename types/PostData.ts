export interface PostMeta {
  date: string;
  description: string;
  title: string;
}

export interface PostPageData {
  meta: PostMeta;
}

export interface PostData {
  id: string;
  data: PostPageData;
}
