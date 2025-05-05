import Layout from "./components/Layout.tsx";

const HomePage = () => {
    return (
        <Layout>
            <div className="flex flex-1 items-center justify-center py-8 px-4">
                <p className="text-white font-parisienne text-5xl text-center backdrop-blur-[2px]">Frank & Corinne</p>
            </div>
        </Layout>
    )
}
export default HomePage;