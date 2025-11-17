export function Program() {
    const items = [
      {
        time: "15:45",
        title: "Торжественная церемония в ЗАГС",
        description: "По адресу: Таганская ул., 44  (присутствие по желанию)",
      },
      {
        time: "16:30",
        title: "Сбор гостей",
        description: "Просим взять с собой улыбки и хорошее настроение",
      },
      {
        time: "17:00",
        title: "Начало банкета",
        description: "Время вкусной еды, танцев и развлечений",
      },
      {
        time: "23:00",
        title: "Завершение банкета",
        description: "К сожалению, даже такой прекрасный день заканчивается",
      },
    ];
  
    return (
      <div className="container">
        <h2 className="font-anastasia text-6xl text-center mb-6">Программа</h2>
        
        <div className="flex flex-col items-start w-fit m-auto">
            {items.map((item, i) => (
                <div key={i} className="group flex gap-x-6">
                    <div className="-mt-1.5">{item.time}</div>

                    <div className="relative">
                        {i !== items.length - 1 && (
                            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-200"></div>
                        )}
                        <span className="relative z-10 grid h-3 w-3 place-items-center rounded-full bg-slate-200 text-slate-800"></span>
                    </div>

                    <div className="-translate-y-1.5 pb-8 text-slate-600">
                        <p className="font-sans text-base font-bold text-slate-800 antialiased">
                            {item.title}
                        </p>
                        <small className="mt-2 font-sans text-sm text-slate-600 antialiased">
                            {item.description}
                        </small>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }
  