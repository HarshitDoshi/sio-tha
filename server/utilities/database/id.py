from uuid import UUID, uuid5, uuid4, uuid1, NAMESPACE_DNS


def create__id() -> UUID:
    id = uuid5(
        NAMESPACE_DNS,
        str(str(uuid4()) + str(uuid1()) + ".personal-finance.staple.io"),
    )
    return id
