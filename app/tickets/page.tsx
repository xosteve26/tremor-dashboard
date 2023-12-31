import TicketTable from "@/src/components/TicketTable";
import { Card, Grid, Metric, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react";

export default async function TicketPage() {
    const eventsResponse = await fetch('https:alpha.theesports.club/events/')
    const events = await  eventsResponse.json()
    console.log("EVENTS", events?.data.content)
    return (
        <main className="flex min-h-screen flex-col items-center p-24">

            <Metric className="">Event Dashboard</Metric>
            <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
            <TicketTable  events={events.data.content}/>
        </main>
    );
}
