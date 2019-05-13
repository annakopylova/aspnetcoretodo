﻿using ASPNetCoreApp.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Logging;

namespace ASPNetCoreApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<DoContext>();

            services.AddDbContext<DoContext>(options => options.UseSqlServer(connection));

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling =
                ReferenceLoopHandling.Ignore;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "SimpleWebApp";
                options.LoginPath = "/";
                options.AccessDeniedPath = "/";
                options.LogoutPath = "/";
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return System.Threading.Tasks.Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;
                    return System.Threading.Tasks.Task.CompletedTask;
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider services)
        {
            CreateUserRoles(services).Wait();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseDefaultFiles();
                app.UseStaticFiles();
                app.UseHttpsRedirection();
                app.UseMvc();
            
        }
        private async System.Threading.Tasks.Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            // Создание ролей администратора и пользователя
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }

            // Создание Администратора
            //string adminEmail = "admin@mail.com";
            //string adminPassword = "Aa123456!";
            //if (await userManager.FindByNameAsync(adminEmail) == null)
            //{
            //    User admin = new User { Email = adminEmail, UserName = adminEmail };
            //    IdentityResult result = await userManager.CreateAsync(admin, adminPassword);
            //    if (result.Succeeded)
            //    {
            //        await userManager.AddToRoleAsync(admin, "admin");
            //    }
            //}

            // Создание Пользователя
            //string userEmail = "user@mail.com";
            //string userPassword = "Aa12345!";
            //if (await userManager.FindByNameAsync(userEmail) == null)
            //{
            //    User user = new User { Email = userEmail, UserName = userEmail };
            //    IdentityResult result = await userManager.CreateAsync(user, userPassword);
            //    if (result.Succeeded)
            //    {
            //        await userManager.AddToRoleAsync(user, "user");
            //    }
            //}
        }
    }
}
