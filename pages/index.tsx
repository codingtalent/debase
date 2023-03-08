import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="page_content">
      building...
    </div>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/profile/${process.env.NEXT_PUBLIC_DEFAULT_ADDRESS}`,
      permanent: false,
    },
  }
}

export default Home
