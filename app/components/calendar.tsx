export function Calendar() {
    return (
        <div className="container">
            <h2 className="font-anastasia text-6xl text-center mb-6">
                Дата бракосочетания
            </h2>

            <p className="text-center mb-2">Июнь</p>
            <div className="w-full grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <div
                        key={num}
                        className={`text-center py-2 ${num === 27 ? 'text-red-500' : ''}`}
                    >
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
}