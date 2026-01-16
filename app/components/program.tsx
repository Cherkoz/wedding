import Image from "next/image";

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
      <div className="relative overflow-hidden">
      <div className="container">
        <Image className="-z-10 absolute w-100 rotate-180 -left-60 md:-left-50 -mt-80 md:-mt-50" src="/assets/images/bg/width_175.webp" width={200} height={200} alt="" />
        <Image className="-z-10 absolute w-100 rotate-200 -right-40 md:-right-30 mt-40 md:mt-20" src="/assets/images/bg/width_175.webp" width={200} height={200} alt="" />

        <h2 className="font-anastasia text-6xl text-center mb-6">Программа</h2>
        
        <div className="flex flex-col items-start w-fit m-auto">
            {items.map((item, i) => (
                <div key={i} className="group flex gap-x-6">
                    <div className="-mt-2.5 text-xl font-bold">{item.time}</div>

                    <div className="relative">
                        {i !== items.length - 1 && (
                            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-second"></div>
                        )}
                        <span className="relative z-10 grid h-3 w-3 place-items-center rounded-full bg-second"></span>
                    </div>

                    <div className="-translate-y-2.5 pb-8">
                        <p className="text-xl font-bold  antialiased">
                            {item.title}
                        </p>
                        <small className="mt-2 text-base antialiased">
                            {item.description}
                        </small>
                    </div>
                </div>
            ))}
        </div>
      </div>
      </div>
    );
  }
  