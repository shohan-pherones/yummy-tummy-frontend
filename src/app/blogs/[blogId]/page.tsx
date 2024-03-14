"use client";

type BlogDetailsPageProps = {
  params: {
    blogId: string;
  };
};

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  console.log(params.blogId);

  return <div>BlogDetailsPage {params.blogId}</div>;
};

export default BlogDetailsPage;
