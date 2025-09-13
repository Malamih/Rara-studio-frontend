import Container from "@/components/Container";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Partner } from "@/types/partners";
import Link from "next/link";

const clientsVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "",
      black: "[&>img]:brightness-0",
      white: "[&>img]:brightness-0 [&>img]:invert",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ClientsProps = VariantProps<typeof clientsVariants> & {
  clients: Partner[];
};

export const Clients = ({ variant, clients }: ClientsProps) => {
  return (
    <section>
      <Container>
        <h4 className="font-normal text-9xl text-center gradient-text mb-10 max-md:text-7xl">
          CLIENTS
        </h4>
        <ul className="clients grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {clients?.length > 0 &&
            clients.map((client, i) => (
              <Link key={i} href={`/portfolio/${client?._id}`}>
                <li className={cn(clientsVariants({ variant }))}>
                  <Image
                    src={client?.logo?.secure_url}
                    width={111.08}
                    height={28}
                    alt={`client-${i}`}
                  />
                </li>
              </Link>
            ))}
          {(clients?.length < 0 || !clients) &&
            Array.from({ length: 14 }).map((_, i) => (
              <li className={cn(clientsVariants({ variant }))} key={i}>
                <Image
                  src="/home/clients/1.png"
                  width={111.08}
                  height={28}
                  alt={`client-${i}`}
                />
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
