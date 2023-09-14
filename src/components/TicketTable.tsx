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
    AccordionBody,
    Accordion,
    AccordionHeader,
    BarList,
    Bold,
    Divider,
    Icon,
    Title,
    Badge,
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

interface Event{
    id: string,
    name: string
    days: Day[]
    slots: number
    slotsAvailable: number

}
interface Ticket{
    id: string,
    name: string,
    user: string,
    checkedIn: boolean,
    orderId: string,
    identifier: string,
}
interface Day {
    title: string,
    day: string,
    salesStart: string,
    salesEnd: string,
    price: number,
    slots: number,
    slotsAvailable: number,
}
interface TicketTableProps {
    events: Event[]; // Specify the type of the events prop
}
import { ArrowsExpandIcon, LightningBoltIcon } from "@heroicons/react/solid";

interface Data {
  name: string;
  value: number;
}

interface Category {
  title: string;
  value: number;
  icon: any;
  color: Color;
  date: string;
  info: string;
  data: Data[];
}

export default function TicketTable({events}: TicketTableProps) {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>("");
    const [selectedEvent, setSelectedEvent] = useState<Event>();
    const [tableData, setTableData] = useState([]);
    const [chosenDay, setChosenDay] = useState(null)
    const [categories, setCategories] = useState([
        {
            title: "Total Tickets",
            metric: "",
            subCategoryValues: [0, 0],
            subCategroyColors: ["emerald", "red"],
            subCategoryTitles: ["CheckIn users", "Un-CheckedIn users"],
        },
        ,
        {
            title: "Total Jira tickets",
            metric: "120",
            subCategoryValues: [10, 40, 50],
            subCategroyColors: ["indigo", "violet", "purple"],
            subCategoryTitles: ["Done", "In Review", "In Implementation"],
        },
        {
            title: "Total interviews",
            metric: "22",
            subCategoryValues: [30, 40, 30],
            subCategroyColors: ["emerald", "yellow", "rose"],
            subCategoryTitles: ["Offer received", "In progress", "Rejected"],
        },
    ]);

    const [eventCategories, setEventCategories] = useState<Category[]>([
        {
            title: "Total Slots",
            value: 0,
            icon: LightningBoltIcon,
            color: "indigo",
            date: "Today",
            info: "Event Days Slots %",
            data: [],
        },
    ])
    
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
          categories[0].metric = data.data.content.length.toString();
          categories[0].subCategoryValues = [(data.data.content.filter((ticket: Ticket) => ticket.checkedIn).length/data.data.content.length)* 100, (data.data.content.filter((ticket: Ticket) => !ticket.checkedIn).length/data.data.content.length) * 100];


          
          console.log("CATEGORIES: ", categories)
        } catch (error) {
          console.error('Error fetching table data', error);
        }
      };

    useEffect(() => {
        if (selectedEventId) {
          fetchTableData(selectedEventId);
        console.log("EVENTS N YUSE", events)
          events.forEach((event:Event) => {
            if(event.id == selectedEventId){
                setSelectedEvent(event)

                setEventCategories([{
                    title: `${event.name}`,
                    value: (event.slots-event.slotsAvailable/event.slots) * 100,
                    icon: LightningBoltIcon,
                    color: "indigo",
                    date: "Today",
                    info: "Event Days Slots %",
                    data:event.days.map((day: Day) => {
                        return {
                            name: day.title,
                            value: ((day.slots-day.slotsAvailable)/day.slots) * 100,
                        }
                    }),
                },])
            }
            });
        }
        console.log(selectedEvent, selectedEventId)
        console.log("EV CATEG", eventCategories)
    }, [selectedEventId, selectedEvent, categories]);
    

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
    const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;
    return (
        <>
        <div className="max-w-sm mx-auto space-y-6 mt-6">
                <Select value={selectedEventId || ''} onChange={handleEventChange}>
                    {events.map((event:Event) => (
                        <SelectItem key={event.id} value={event.id}>
                            {event.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <TabGroup className="mt-6">
                
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsSm={1} numItemsLg={1} className="gap-6 mb-6">
                            {eventCategories.map((item) => (
                                <Card decoration="left" decorationColor={item.color} key={item.title} className="h-fit">
                                    
                                    <Flex justifyContent="start" className="space-x-4 mb-2">
                                    {/* <Icon variant="outlined" icon={item.icon} size="sm" color={item.color} /> */}
                                    <Title className="truncate">{item.title}</Title>
                                    </Flex> 
                                    <Badge color={item.color} className="mb-2 mr-2" size="xs">
                                        {`Total: 600`} 
                                    </Badge>
                                    <Badge color={"green"} className="mb-2" size="xs">
                                        {`Available: 200`} 
                                    </Badge>
                                <Flex>
                                    <Text>{selectedEvent && selectedEvent.slots - selectedEvent.slotsAvailable} &bull; {selectedEvent && (((selectedEvent.slots - selectedEvent.slotsAvailable) / selectedEvent.slots) * 100).toFixed(2)}%</Text>
                                    <Text>{selectedEvent && selectedEvent.slots}</Text>
                                    </Flex>
                                    <ProgressBar showAnimation={true} value={selectedEvent ? selectedEvent.slots - selectedEvent.slotsAvailable : 0} color="teal" className="mt-3" />
                                <Divider />
                                <Text>
                                    Last Inspection: <Bold>{item.date}</Bold>
                                </Text>
                                <Accordion className="mt-4">
                                    <AccordionHeader>
                                    <div className="space-y-2">
                                        <Text>{item.info}</Text>
                                    </div>
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <BarList
                                            key={item.title}
                                            data={[{"name": "Day 1", "value": 20}, {"name": "Day 2", "value": 40}, {"name": "Day 3", "value": 80}]}
                                            className="mt-2"
                                            valueFormatter={dataFormatter}
                                        />
                                    
                                    </AccordionBody>
                                </Accordion>
                                </Card>
                            ))}
                        </Grid>
                        <TabList>
                            {selectedEvent? selectedEvent.days.map((day: Day) => {
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
                            }): <></>}
                        </TabList>
                        <div className="mt-6">
                            <Card>
                                <div className="h-80" >
                                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6 mb-2">
                        {categories[0].metric && categories.map((item) => (
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
                        </div>
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
                    {tableData.map((ticket: Ticket) => (
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