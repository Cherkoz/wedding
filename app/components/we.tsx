import Image from "next/image";

export function We() {
    return (
        <div className="container flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col gap-6">
                <h2 className="text-4xl">Да - да это мы</h2>
                <p className="text-xl">когда- то мы были детьми, беззаботными
                    и веселыми, а потом выросли и встретили
                    друг друга.... и поняли, что хотим быть
                    вместе навсегда
                </p>
            </div>
            <Image src="/assets/images/this-us.jpg"
                className="w-full md:w-[300px] max-w-full"
                width={300}
                height={400}
                alt=""
            />
        </div>
    );
}