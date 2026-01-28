
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const STUDENTS = [
    { id: 1, name: "Amit Patel", course: "B.Tech CS", status: "Paid", date: "2024-01-15" },
    { id: 2, name: "Sneha Gupta", course: "MBA", status: "Verified", date: "2024-01-14" },
    { id: 3, name: "Raj Singh", course: "BBA", status: "Pending", date: "2024-01-12" },
];

const MyStudents = () => {
    return (
        <DashboardLayout role="ambassador">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Students</h1>
                    <p className="text-muted-foreground mt-1">Track the students you have referred</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Referrals List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {STUDENTS.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>{student.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={student.status === "Paid" ? "default" : "secondary"}>
                                                {student.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default MyStudents;
