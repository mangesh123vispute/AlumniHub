from .models import User
import django_filters


class AlumniFilter(django_filters.FilterSet):
    first_name = django_filters.CharFilter(lookup_expr='icontains')
    last_name = django_filters.CharFilter(lookup_expr='icontains')
    Branch = django_filters.CharFilter(lookup_expr='icontains')
    skills = django_filters.CharFilter(lookup_expr='icontains')
    About = django_filters.CharFilter(lookup_expr='icontains')
    Work = django_filters.CharFilter(lookup_expr='icontains')


    class Meta:
        model = User
        fields = [ 'skills','Branch','Work','first_name', 'last_name','About',   ]
