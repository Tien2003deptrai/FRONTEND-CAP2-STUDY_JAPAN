import React from 'react'

const Event = () => {
    return (
        <div className="min-h-screen bg-white py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Banner */}
                <div className="rounded-2xl overflow-hidden shadow-xl mb-10">
                    <img
                        src="https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/45/2d/t-t-3335-japan-display-banner_ver_2.jpg"
                        alt="Mochi Banner"
                        className="w-full object-cover"
                    />
                </div>

                {/* Intro Text */}
                <div className="text-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                        Let's Join the MochiMochi-learn Japanese group
                    </h2>
                    <ul className="text-sm sm:text-base text-gray-700 space-y-1">
                        <li>
                            ⭐ Get free learning materials and giveaways every
                            month
                        </li>
                        <li>
                            ⭐ Connect and practice Japanese with other learners
                        </li>
                    </ul>

                    <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-md transition">
                        JOIN US NOW
                    </button>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="MOCHIKANJI"
                        description="Learn Kanji & vocabulary"
                        icon="https://nihongoichiban.com/wp-content/uploads/2011/04/katsuobushi-banner.jpg"
                    />
                    <FeatureCard
                        title="MOCHIKANA"
                        description="Learn Hiragana & Katakana"
                        icon="https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/21/ca/au-jp-1714721843-katakana-display-banner_ver_1.jpg"
                    />
                    <FeatureCard
                        title="J DICTIONARY"
                        description="Look up Kanji & vocabulary"
                        icon="https://www.shutterstock.com/image-vector/japanese-kanji-banner-set-translation-260nw-1927274252.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="bg-white border rounded-xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition">
            <img src={icon} alt={title} className="w-16 h-16 mb-4" />
            <h3 className="text-lg font-bold text-blue-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    )
}

export default Event
