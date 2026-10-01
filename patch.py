import os

admin_path = r'F:\handicrafts\main_website\handicraft_api\admin.py'
with open(admin_path, 'r') as f:
    content = f.read()

old_admin = '''authentication_backend = AdminAuth(secret_key=os.getenv("SECRET_KEY", "fallback"))
admin = Admin(engine, authentication_backend=authentication_backend, title="Handicraft CMS")
admin.add_view(ProductAdmin)
admin.add_view(AboutAdmin)
admin.add_view(HomeAdmin)
admin.add_view(ContactAdmin)
admin.add_view(UserAdmin)'''

new_admin = '''def setup_admin(app):
    authentication_backend = AdminAuth(secret_key=os.getenv("SECRET_KEY", "fallback"))
    admin = Admin(app, engine, authentication_backend=authentication_backend, title="Handicraft CMS")
    admin.add_view(ProductAdmin)
    admin.add_view(AboutAdmin)
    admin.add_view(HomeAdmin)
    admin.add_view(ContactAdmin)
    admin.add_view(UserAdmin)'''

content = content.replace(old_admin, new_admin)
with open(admin_path, 'w') as f:
    f.write(content)

main_path = r'F:\handicrafts\main_website\handicraft_api\main.py'
with open(main_path, 'r') as f:
    content = f.read()

content = content.replace('from admin import admin         # SQLAdmin (Phase 6)', 'from admin import setup_admin')
content = content.replace('admin.mount_to(app)', 'setup_admin(app)')

with open(main_path, 'w') as f:
    f.write(content)
