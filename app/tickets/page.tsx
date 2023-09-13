import {Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title} from "@tremor/react";
import { Select, SelectItem } from "@tremor/react";
import axios from "axios";

// export async function getServerSideProps() {
//     try {
//         // Fetch data from JSONPlaceholder on the server side
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//
//         return {
//             props: {
//                 posts: await response.json(),
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: {
//                 posts: [],
//             },
//         };
//     }
// }
// @ts-ignore
export default function TicketPage(){

    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <Title>Dashboard</Title>
                <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
                <div className="max-w-sm mx-auto space-y-6 mt-6">
                    <Select>

                    </Select>
                </div>
                <TabGroup className="mt-6">
                    <TabList>
                        <Tab>Page 1</Tab>
                        <Tab>Page 2</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                            </Grid>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-80" />
                                </Card>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-96" />
                                </Card>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        );
    }
