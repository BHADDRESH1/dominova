import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { verificationService } from "@/services/verificationService";

const MyStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Replace with a specific API if you want only "my" students (e.g., by ambassador ID)
        const data = await verificationService.getPendingVerifications();
        setStudents(data);
      } catch (e) {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground mt-1">
            Track the students you have referred
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Referrals List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : students.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Currently no students
              </div>
            ) : (
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
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name || student.full_name || "Unknown"}
                      </TableCell>
                      <TableCell>
                        {student.course || student.department || "-"}
                      </TableCell>
                      <TableCell>
                        {student.date || student.created_at || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "paid" ? "default" : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyStudents;
