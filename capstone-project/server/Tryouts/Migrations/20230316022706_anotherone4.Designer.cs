﻿// <auto-generated />
using System;
using LMS;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LMS.Migrations
{
    [DbContext(typeof(AppContext))]
    [Migration("20230316022706_anotherone4")]
    partial class anotherone4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LMS.Models.Attendence", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("StudentID")
                        .HasColumnType("bigint");

                    b.Property<short?>("approved")
                        .HasColumnType("smallint");

                    b.Property<long>("daysAttended")
                        .HasColumnType("bigint");

                    b.Property<long?>("managerID")
                        .HasColumnType("bigint");

                    b.Property<long?>("teacherID")
                        .HasColumnType("bigint");

                    b.Property<long>("trainingID")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("StudentID");

                    b.HasIndex("managerID");

                    b.HasIndex("teacherID");

                    b.HasIndex("trainingID");

                    b.ToTable("Attendence");
                });

            modelBuilder.Entity("LMS.Models.Feedbacks", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("TrainingID")
                        .HasColumnType("bigint");

                    b.Property<long>("UserID")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("TrainingID");

                    b.HasIndex("UserID");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("LMS.Models.Trainings", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("OwnerID")
                        .HasColumnType("bigint");

                    b.Property<int>("Scope")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("OwnerID");

                    b.ToTable("Trainings");
                });

            modelBuilder.Entity("LMS.Models.Users", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<bool>("IsConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LMS.Models.Attendence", b =>
                {
                    b.HasOne("LMS.Models.Users", "Student")
                        .WithMany()
                        .HasForeignKey("StudentID");

                    b.HasOne("LMS.Models.Users", "Manager")
                        .WithMany()
                        .HasForeignKey("managerID");

                    b.HasOne("LMS.Models.Users", "Teacher")
                        .WithMany()
                        .HasForeignKey("teacherID");

                    b.HasOne("LMS.Models.Trainings", "Training")
                        .WithMany()
                        .HasForeignKey("trainingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Manager");

                    b.Navigation("Student");

                    b.Navigation("Teacher");

                    b.Navigation("Training");
                });

            modelBuilder.Entity("LMS.Models.Feedbacks", b =>
                {
                    b.HasOne("LMS.Models.Trainings", "Training")
                        .WithMany()
                        .HasForeignKey("TrainingID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LMS.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Training");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LMS.Models.Trainings", b =>
                {
                    b.HasOne("LMS.Models.Users", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });
#pragma warning restore 612, 618
        }
    }
}
