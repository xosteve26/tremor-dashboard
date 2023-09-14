'use client'
import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
    DeltaType,
    MultiSelect,
    MultiSelectItem,
    SelectItem,
    Select,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Grid,
    CategoryBar,
    Legend,
    Color,
} from "@tremor/react";
import {  Metric, Text, Flex, ProgressBar,  } from "@tremor/react";
import { useEffect, useState } from "react";

type SalesPerson = {
    name: string;
    leads: number;
    sales: string;
    quota: string;
    variance: string;
    region: string;
    status: string;
    deltaType: DeltaType;
};

const salesPeople: SalesPerson[] = [
    {
        name: "Peter Doe",
        leads: 45,
        sales: "1,000,000",
        quota: "1,200,000",
        variance: "low",
        region: "Region A",
        status: "overperforming",
        deltaType: "moderateIncrease",
    },
    {
        name: "Lena Whitehouse",
        leads: 35,
        sales: "900,000",
        quota: "1,000,000",
        variance: "low",
        region: "Region B",
        status: "average",
        deltaType: "unchanged",
    },
    {
        name: "Phil Less",
        leads: 52,
        sales: "930,000",
        quota: "1,000,000",
        variance: "medium",
        region: "Region C",
        status: "underperforming",
        deltaType: "moderateDecrease",
    },
    {
        name: "John Camper",
        leads: 22,
        sales: "390,000",
        quota: "250,000",
        variance: "low",
        region: "Region A",
        status: "overperforming",
        deltaType: "increase",
    },
    {
        name: "Max Balmoore",
        leads: 49,
        sales: "860,000",
        quota: "750,000",
        variance: "low",
        region: "Region B",
        status: "overperforming",
        deltaType: "increase",
    },
    {
        name: "Peter Moore",
        leads: 82,
        sales: "1,460,000",
        quota: "1,500,000",
        variance: "low",
        region: "Region A",
        status: "average",
        deltaType: "unchanged",
    },
    {
        name: "Joe Sachs",
        leads: 49,
        sales: "1,230,000",
        quota: "1,800,000",
        variance: "medium",
        region: "Region B",
        status: "underperforming",
        deltaType: "moderateDecrease",
    },
];



export default function TicketTable({events}) {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>("");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [tableData, setTableData] = useState([]);
    const [chosenDay, setChosenDay] = useState(null)

    
      const fetchTableData = async (selectedEventId: string) => {
        console.log("SELECTED ID: ", selectedEventId)
        try {
          const response = await fetch(`https://alpha.theesports.club/events/ticket/event/${selectedEventId}`);
          if (!response.ok) {
            throw new Error(`Error fetching data for event ${selectedEventId}`);
          }
          const data = await response.json();
          console.log("TABLE DATA", tableData)
          setTableData(data.data.content);
           
        } catch (error) {
          console.error('Error fetching table data', error);
        }
      };
    
      const categories: {
        title: string;
        metric: string;
        subCategoryValues: number[];
        subCategroyColors: Color[];
        subCategoryTitles: string[];
      }[] = [
        {
          title: "Total Tickets",
          metric: "",
          subCategoryValues: [30, 100],
          subCategroyColors: ["emerald", "red"],
          subCategoryTitles: ["CheckIn users", "Un-CheckedIn users"],
        }
      ];

    useEffect(() => {
        if (selectedEventId) {
          fetchTableData(selectedEventId);
        console.log("EVENTS N YUSE", events)
          events.data.content.forEach(event => {
            if(event.id == selectedEventId){
                setSelectedEvent(event)
            }
            });
        }
        console.log(selectedEvent, selectedEventId)
    }, [selectedEventId, selectedEvent]);
      

    const handleEventChange = (e:any) => {
        console.log("Ev", e)
        const selectedEventId = e;
        setSelectedEventId(selectedEventId); 
    };

    const handleDayChange = (e:any) => {
        const selectedDay = e
        setChosenDay(selectedDay)
    }

    const isSalesPersonSelected = (salesPerson: SalesPerson) =>
        selectedNames.includes(salesPerson.name) || selectedNames.length === 0;

    return (
        <>
        <div className="max-w-sm mx-auto space-y-6 mt-6">
                <Select value={selectedEventId || ''} onChange={handleEventChange}>
                    {events.data.content.map((event:any) => (
                        <SelectItem key={event.id} value={event.id}>
                            {event.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <TabGroup className="mt-6">
                <TabList>
                    {selectedEvent && selectedEvent.days.map((day:any) => {
                        console.log(day);
                        const formattedDate = new Date(day.day).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                        });
                        // Define a click handler for the tab
                        const handleTabClick = (e:any) => {
                            setChosenDay(e)
                        };
                        return <Tab key={day.day} onClick={handleTabClick}>{formattedDate} </Tab>;
                    })}
                </TabList>
                
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                        {categories.map((item) => (
                            <Card key={item.title}>
                            <Text>{item.title}</Text>
                            <Metric>{item.metric}</Metric>
                            <CategoryBar
                                values={item.subCategoryValues}
                                colors={item.subCategroyColors}
                                className="mt-4"
                            />
                            <Legend
                                categories={item.subCategoryTitles}
                                colors={item.subCategroyColors}
                                className="mt-3"
                            />
                            </Card>
                        ))}
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
        <Card>
            <MultiSelect
                onValueChange={setSelectedNames}
                placeholder="Select Salespeople..."
                className="max-w-xs"
            >
                {salesPeople.map((item) => (
                    <MultiSelectItem key={item.name} value={item.name}>
                        {item.name}
                    </MultiSelectItem>
                ))}
            </MultiSelect>
            <Table className="mt-6">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-center">Name</TableHeaderCell>
                        <TableHeaderCell className="text-center">Email</TableHeaderCell>
                        <TableHeaderCell className="text-center">OrderId</TableHeaderCell>
                        <TableHeaderCell className="text-center">TicketId</TableHeaderCell>
                        <TableHeaderCell className="text-center">Status</TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableData.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell className="text-center">{ticket.name}</TableCell>
                                <TableCell className="text-center">{ticket.user}</TableCell>
                                <TableCell className="text-center">{ticket.orderId}</TableCell>
                                <TableCell className="text-center">{ticket.identifier}</TableCell>
                                <TableCell className="text-center">
                                    <BadgeDelta className="text-center" deltaType={ticket.checkedIn ? "moderateIncrease": "moderateDecrease"} size="xs">
                                        {ticket.checkedIn ? "In": "Out"}
                                    </BadgeDelta>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Card>
        </>
    );
}