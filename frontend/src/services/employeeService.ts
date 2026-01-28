export interface Employee {
  id: string;
  employee_id_code: string;
  full_name: string;
  designation: string;
  department: string;
  status: "active" | "inactive";
  employment_type: "Full-time" | "Part-time" | "Contract";
  date_of_joining: string;
}

const API_BASE = "/api/employees";

export const employeeService = {
  async getAllEmployees(): Promise<Employee[]> {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  },

  async createEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
  },
};
