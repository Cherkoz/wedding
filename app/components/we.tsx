import Image from "next/image";

export function We() {
    return (
        <div className="container flex flex-col justify-between md:flex-row items-center gap-6">
            <div className="flex flex-col gap-6">
                <h2 className="text-4xl text-center md:text-left">Да - да это мы</h2>
                <p className="text-xl max-w-[600px] text-center md:text-left">когда- то мы были детьми, беззаботными
                    и веселыми, а потом выросли и встретили
                    друг друга.... и поняли, что хотим быть
                    вместе навсегда
                </p>
            </div>
            <Image src="/assets/images/this-us.jpg"
                className="w-full md:w-[300px] max-w-[400px]"
                width={300}
                height={400}
                alt=""
            />
        </div>
    );
}