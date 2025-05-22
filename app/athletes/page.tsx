import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

export default async function AthletesPage() {
    const filePath = path.join(process.cwd(), 'public/datas/athletes.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const athletes = JSON.parse(data);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">Nos Athlètes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {athletes.map((athlete: any) => (
                    <Link href={`/athletes/${athlete.slug}`} key={athlete.id}>
                        <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group">
                            <Image
                                src={athlete.image}
                                alt={athlete.name}
                                width={400}
                                height={500}
                                className="object-cover w-full h-80 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/70 to-transparent p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{athlete.name}</h2>
                                <p className="text-xs text-gray-500">{athlete.sport}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}