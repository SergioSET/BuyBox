import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Home() {
  
  

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A table of users retrieved from our Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable  />
      </Card>
    </main>
  );
}
