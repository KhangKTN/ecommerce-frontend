import {
    Banner,
    BestSeller,
    DailyDeal,
    FeatureProduct,
    HotCollections,
    NewArrival,
    Sidebar
} from '../../components/home'

const Home = () => {
    return (
        <>
            <div className='my-3 flex gap-x-5'>
                <div className='min-w-[25%]'>
                    <Sidebar />
                    <DailyDeal />
                </div>
                <div className='flex-auto w-[75%] pr-5'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <FeatureProduct />
            <NewArrival />
            <HotCollections />
        </>
    )
}

export default Home
