import useFetchAllDecks from '@/hooks/useFetchAllDecks'

function Flashcard() {
    const { data: decks } = useFetchAllDecks()
    return (
        <div>
            {decks?.map((deck) => (
                <div key={deck._id}>
                    <h2>{deck.deck_title}</h2>
                </div>
            ))}
        </div>
    )
}
export default Flashcard
