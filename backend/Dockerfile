FROM python:3.13-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV UV_LINK_MODE=copy
ENV UV_PROJECT_ENVIRONMENT=/opt/venv
ENV PATH=/opt/venv/bin:$PATH
ENV DEBIAN_FRONTEND=noninteractive

COPY --from=ghcr.io/astral-sh/uv:0.9.17 /uv /uvx /bin/

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        binutils \
        libgdal32 \
        libgeos-c1v5 \
        libproj25 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-dev --no-install-project

COPY . .

EXPOSE 8000

CMD ["uv", "run", "--no-sync", "python", "manage.py", "runserver", "0.0.0.0:8000"]
