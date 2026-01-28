import {
  pgTable,
  uuid,
  text,
  timestamp,
  decimal,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==================== PROFILES ====================
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: text("role").notNull().default("ambassador"), // owner, admin, ambassador, employee
  avatarUrl: text("avatar_url"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== EMPLOYEES ====================
export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").references(() => profiles.id),
  employeeIdCode: text("employee_id_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  designation: text("designation").notNull(),
  department: text("department").notNull(),
  dateOfJoining: date("date_of_joining").notNull(),
  employmentType: text("employment_type").notNull(), // Full-time, Part-time, Contract
  reportingManagerId: uuid("reporting_manager_id"),
  email: text("email").notNull(),
  contactNumber: text("contact_number"),
  status: text("status").default("active"), // active, inactive
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== SALARIES ====================
export const salaries = pgTable("salaries", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .references(() => employees.id)
    .notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  baseSalary: decimal("base_salary", { precision: 10, scale: 2 }),
  bonuses: decimal("bonuses", { precision: 10, scale: 2 }).default("0"),
  deductions: decimal("deductions", { precision: 10, scale: 2 }).default("0"),
  paymentStatus: text("payment_status").default("pending"), // paid, pending, processing
  paymentDate: date("payment_date"),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== PERFORMANCE REVIEWS ====================
export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .references(() => employees.id)
    .notNull(),
  reviewDate: date("review_date").notNull(),
  rating: text("rating").notNull(), // Excellent, Good, Needs Improvement
  remarks: text("remarks"),
  goalsMet: boolean("goals_met"),
  createdBy: uuid("created_by").references(() => profiles.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== AMBASSADOR DETAILS ====================
export const ambassadorDetails = pgTable("ambassador_details", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull()
    .unique(),
  collegeName: text("college_name"),
  course: text("course"),
  yearOfStudy: text("year_of_study"),
  referralCode: text("referral_code").unique(),
  status: text("status").default("active"), // active, inactive
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== STUDENTS (Referrals) ====================
export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  courseInterested: text("course_interested"),
  referredById: uuid("referred_by_id").references(() => ambassadorDetails.id),
  status: text("status").default("pending"), // pending, verified, paid, offer_letter_sent, joined
  paymentProofUrl: text("payment_proof_url"),
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==================== RELATIONS ====================
export const employeesRelations = relations(employees, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [employees.profileId],
    references: [profiles.id],
  }),
  salaries: many(salaries),
  performanceReviews: many(performanceReviews),
}));

export const salariesRelations = relations(salaries, ({ one }) => ({
  employee: one(employees, {
    fields: [salaries.employeeId],
    references: [employees.id],
  }),
}));

export const ambassadorDetailsRelations = relations(
  ambassadorDetails,
  ({ one, many }) => ({
    profile: one(profiles, {
      fields: [ambassadorDetails.profileId],
      references: [profiles.id],
    }),
    students: many(students),
  }),
);

export const studentsRelations = relations(students, ({ one }) => ({
  referredBy: one(ambassadorDetails, {
    fields: [students.referredById],
    references: [ambassadorDetails.id],
  }),
}));

// Type exports
export type Profile = typeof profiles.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Salary = typeof salaries.$inferSelect;
export type AmbassadorDetail = typeof ambassadorDetails.$inferSelect;
export type Student = typeof students.$inferSelect;
