from django import template

register = template.Library()

@register.simple_tag
def query_transform(request, **kwargs):
    print("i am getting callled")
    updated = request.GET.copy()
    for k, v in kwargs.items():
        if v is not None:
            updated[k] = v
        else:
            updated.pop(k, 0)

    return updated.urlencode()


@register.filter
def get_icon_class(tag):
    icon_classes = {
        'success': 'fas fa-check',
        'info': 'fas fa-info',
        'warning': 'fas fa-exclamation-triangle',
        'danger': 'fas fa-ban',
        'error': 'fas fa-times-circle'
    }
    return icon_classes.get(tag, 'fas fa-info-circle')