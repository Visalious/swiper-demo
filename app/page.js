import BarChart from '@/components/BarChart/BarChart'
import EventCard from '@/components/CardsSwiper/Card/Card';
import TinderCards from '@/components/CardsSwiper/CardsSwiper'
import Image from 'next/image'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center min-w-[400px] flex-col w-fit bg-[#fcfcfc] p-[10px] rounded-[21px]">
        <h2 className='text-lg font-semibold w-full text-left p-3'>Money Earned in USD</h2>
        <BarChart />
      </div>
      <TinderCards />

    </main>
  )
}
