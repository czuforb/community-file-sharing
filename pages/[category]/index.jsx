import { useRouter } from "next/router";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
//
import Layout from "../../src/components/Layout/Layout";
import PageHeader from "../../src/components/Layout/PageHeader";
//
import LoadingSkeleton from "../../src/components/Cards/CategoryCard/LoadingSkeleton";
//
import NewSubCategoryCard from "../../src/components/Buttons/NewSubCategoryButton";
import CategoryCard from "../../src/components/Cards/CategoryCard";
import { authVar } from "../../src/graphql/client/cache";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { loading, error, data } = useQuery(GET_SUBCATEGORIES_IN_CATEGORY, {
    variables: {
      slug: category,
    },
  });

  const auth = useReactiveVar(authVar);
  return (
    <Layout title={data && data.listSubcategoriesInCategory.title}>
      {data && data.listSubcategoriesInCategory && (
        <PageHeader data={data.listSubcategoriesInCategory} loading={loading} />
      )}
      {loading && (
        <>
          <LoadingSkeleton loading={true} />
          <LoadingSkeleton loading={true} />
          <LoadingSkeleton loading={true} />
          <LoadingSkeleton loading={true} />
          <LoadingSkeleton loading={true} />
          <LoadingSkeleton loading={true} />
        </>
      )}
      {data &&
        data.listSubcategoriesInCategory &&
        data.listSubcategoriesInCategory.subcategories.map((e, i) => (
          <CategoryCard
            key={i}
            loading={loading}
            data={e}
            category={data.listSubcategoriesInCategory.slug}
          />
        ))}
      {auth.admin && <NewSubCategoryCard />}
    </Layout>
  );
};

export default CategoryPage;

export async function getServerSideProps(context) {
  const categories = [
    "tudasprogramok",
    "tudastar",
    "jo-gyakorlatok",
    "halozatok",
  ];

  const cat = categories.includes(context.query.category);

  if (!cat) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

const GET_SUBCATEGORIES_IN_CATEGORY = gql`
  query($slug: String) {
    listSubcategoriesInCategory(slug: $slug) {
      title
      description
      public
      slug
      subcategories {
        title
        description
        slug
        icon
      }
    }
  }
`;
