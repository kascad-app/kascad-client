'use client'

import Image from 'next/image';
import './profile.css';
import Link from 'next/link';
import { useState } from 'react';
import ShapeCanvas from './ShapeCanvas';

const Profile = {
    name: "Marie-Claire QUENOT",
    sport: "BMX",
    bio: [
        "Skieur professionnel, freeskieur et snowboardeur, défie les conventions avec son style unique et ses exploits audacieux.",
        "Sur les pentes, il repousse les limites de l'impossible, enchaînant figures acrobatiques et descentes périlleuses avec une grâce inégalée. Ses vidéos virales, capturant ses prouesses, ont fait de lui une icône des sports d'hiver.",
        "Son palmarès impressionnant témoigne de son talent et de sa détermination.",
        "Son engagement ne se limite pas au sport, il est également entrepreneur et créateur de contenu, partageant sa passion avec le monde entier.",
        "Candide Thovex, un virtuose de la neige qui inspire et émerveille."
    ],
    stats: {
        age: { label: "ans", value: 19 },
        podiums: { label: "podiums", value: 5 },
        videos: { label: "vidéos", value: 16 },
        photos: { label: "photos", value: 16 }
    },
    location: "Paris, France",
    socials: {
        label: "Suivez moi sur",
        links: {
            youtube: "https://www.youtube.com/",
            twitter: "https://x.com/",
            instagram: "https://www.instagram.com/"
        }
    },
    media: {
        videos: Array(16).fill('/views/profile/profile.png'),
        images: Array(16).fill('/views/profile/profile.png')
    },
    instagram: {
        username: "@marieclairekeno",
        description: [
            "Exploring the 🌎 from skiing's point of view🙏📹",
            "@dynafit📍Montana",
            "Let’s go to Japan!👇",
            "@freerideworldtour Champion 2020"
        ],
        posts: Array(8).fill('/views/profile/profile.png')
    }
};

export default function ProfileComponent(): JSX.Element {
    const [visibleVideoImages, setVisibleVideoImages] = useState(4);
    const [visibleImageImages, setVisibleImageImages] = useState(4);

    const handleShowMoreVideos = () => {
        setVisibleVideoImages((prev) => (prev + 4 >= Profile.media.videos.length ? Profile.media.videos.length : prev + 4));
    };

    const handleResetVideos = () => {
        setVisibleVideoImages(4);
    };

    const handleShowMoreImages = () => {
        setVisibleImageImages((prev) => (prev + 4 >= Profile.media.images.length ? Profile.media.images.length : prev + 4));
    };

    const handleResetImages = () => {
        setVisibleImageImages(4);
    };

    return (
        <div className='profile'>
            <div className='profile_hero'>
                <ShapeCanvas className='profile_hero_canva' />
                <p>{Profile.sport}</p>
                <h1>{Profile.name}</h1>
            </div>
            <div className='profile_infos'>
                <div className='profile_infos_image'>
                    <Image src={'/views/profile/profile.png'} alt={Profile.name} width={900} height={900} />
                </div>
                <div className='profile_infos_content'>
                    {Profile.bio.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}

                    <div className='profile_infos_stats'>
                        {Object.entries(Profile.stats).map(([key, stat]) => (
                            <div key={key}>
                                <div>{stat.value}</div>
                                <div className='label'>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className='profile_infos_loc'>
                        <span>{Profile.location}</span>
                    </div>

                    <div className='profile_infos_socials'>
                        <span className='label'>{Profile.socials.label}</span>
                        <div className='logos'>
                            <Link href={Profile.socials.links.youtube}>
                                <img
                                    src="/views/logos/facebook-circle-fill.svg"
                                    alt="Facebook"
                                    className="h-10 w-10"
                                />
                            </Link>
                            <Link href={Profile.socials.links.twitter}>
                                <img
                                    src="/views/logos/twitter-x-line.svg"
                                    alt="Twitter"
                                    className="h-10 w-10"
                                />
                            </Link>
                            <Link href={Profile.socials.links.instagram}>
                                <img
                                    src="/views/logos/instagram-line.svg"
                                    alt="Instagram"
                                    className="h-10 w-10"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile_medias'>
                <div className='profile_media'>
                    <h3 className='profile_media_title'>Vidéo</h3>
                    <div className='gallery'>
                        {Profile.media.videos.slice(0, visibleVideoImages).map((video, index) => (
                            <Image key={index} src={video} alt={`Vidéo ${index + 1}`} width={300} height={300} className='gallery_video' />
                        ))}
                    </div>
                    <div className='gallery_buttons'>
                        {visibleVideoImages < Profile.media.videos.length ? (
                            <button onClick={handleShowMoreVideos}>Voir plus de vidéos</button>
                        ) : (
                            <button onClick={handleResetVideos}>Réinitialiser</button>
                        )}
                    </div>
                </div>
                <div className='profile_media'>
                    <h3 className='profile_media_title'>Images</h3>
                    <div className='gallery'>
                        {Profile.media.images.slice(0, visibleImageImages).map((image, index) => (
                            <Image key={index} src={image} alt={`Image ${index + 1}`} width={300} height={300} className='gallery_image' />
                        ))}
                    </div>
                    <div className='gallery_buttons'>
                        {visibleImageImages < Profile.media.images.length ? (
                            <button onClick={handleShowMoreImages}>Voir plus d'images</button>
                        ) : (
                            <button onClick={handleResetImages}>Réinitialiser</button>
                        )}
                    </div>
                </div>
                <div className='profile_media'>
                    <div className='logo_insta'></div>
                    <div className='profile_insta_name'>{Profile.instagram.username}</div>
                    <div className='profile_insta_desc'>
                        {Profile.instagram.description.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        ))}
                    </div>
                    <div className='profile_insta_posts'>
                        {Profile.instagram.posts.map((post, index) => (
                            <Image key={index} src={post} alt={`Vidéo ${index + 1}`} width={300} height={300} className='insta_post' />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}