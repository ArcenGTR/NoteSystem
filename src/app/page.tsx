import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-black bg-cover bg-center" style={{backgroundImage: "url('/images/layered-waves-haikei-big.svg')",}}>

      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-screen">

        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/20 w-4/5 sm:max-2-96 mx-auto sm:text-2xl">
          <h1 className="font-bold">Repair Shop</h1>
          <address>
            <p>Repair St., 23</p>
            <p>Krakow 12-345</p>
          </address>
          <Link href="tel:+48123456789" className="hover:underline">
            +48 123 456 789
          </Link>

        </div>

      </main>

    </div>
  );
}
