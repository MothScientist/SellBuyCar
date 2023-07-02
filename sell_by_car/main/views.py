from django.shortcuts import render


def main_page_render(request):
    return render(request, 'main/home.html')
